const FIREBASE_VERSION = "12.18.0";

let servicesPromise = null;

function isConfigured() {
  const config = window.FIREBASE_CONFIG || {};
  return Boolean(
    config.apiKey &&
    config.projectId &&
    !String(config.apiKey).startsWith("REPLACE_") &&
    !String(config.projectId).startsWith("REPLACE_")
  );
}

async function getServices() {
  if (!isConfigured()) return null;
  if (servicesPromise) return servicesPromise;

  servicesPromise = Promise.all([
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-auth.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_VERSION}/firebase-firestore.js`)
  ]).then(([appModule, authModule, firestoreModule]) => {
    const app = appModule.initializeApp(window.FIREBASE_CONFIG);

    return {
      auth: authModule.getAuth(app),
      db: firestoreModule.getFirestore(app),
      authModule,
      firestoreModule
    };
  });

  return servicesPromise;
}

async function upsertProfile(user, locale) {
  const services = await getServices();
  if (!services || !user) return;

  const firestore = services.firestoreModule;
  const profileRef = firestore.doc(services.db, "users", user.uid);
  const existing = await firestore.getDoc(profileRef);

  const profile = {
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    email: user.email || "",
    locale: locale || "es",
    lastLoginAt: firestore.serverTimestamp()
  };

  if (!existing.exists()) {
    profile.createdAt = firestore.serverTimestamp();
  }

  await firestore.setDoc(profileRef, profile, { merge: true });
}

export function firebaseIsConfigured() {
  return isConfigured();
}

export async function observeUser(callback, locale) {
  const services = await getServices();

  if (!services) {
    callback(null);
    return () => {};
  }

  return services.authModule.onAuthStateChanged(
    services.auth,
    async (user) => {
      if (user) {
        try {
          await upsertProfile(user, locale);
        } catch (error) {
          console.warn("Unable to update profile", error);
        }
      }

      callback(user || null);
    }
  );
}

export async function signInWithGoogle(locale) {
  const services = await getServices();

  if (!services) {
    throw new Error("FIREBASE_NOT_CONFIGURED");
  }

  services.auth.languageCode = locale || "es";

  await services.authModule.setPersistence(
    services.auth,
    services.authModule.browserLocalPersistence
  );

  const provider = new services.authModule.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const result = await services.authModule.signInWithPopup(
    services.auth,
    provider
  );

  await upsertProfile(result.user, locale);
  return result.user;
}

export async function signOutUser() {
  const services = await getServices();
  if (!services) return;

  await services.authModule.signOut(services.auth);
}

export async function getProgress(userId) {
  const services = await getServices();
  if (!services || !userId) return {};

  const firestore = services.firestoreModule;
  const snapshot = await firestore.getDocs(
    firestore.collection(services.db, "users", userId, "progress")
  );

  const progress = {};

  snapshot.forEach((item) => {
    progress[item.id] = item.data();
  });

  return progress;
}

export async function saveProgress(userId, activityId, payload) {
  const services = await getServices();
  if (!services || !userId) return;

  const firestore = services.firestoreModule;

  await firestore.setDoc(
    firestore.doc(services.db, "users", userId, "progress", activityId),
    {
      status: "completed",
      activityId,
      updatedAt: firestore.serverTimestamp(),
      ...(payload || {})
    },
    { merge: true }
  );
}

export async function recordEvent(userId, type, detail) {
  const services = await getServices();
  if (!services || !userId) return;

  const firestore = services.firestoreModule;

  await firestore.addDoc(
    firestore.collection(services.db, "users", userId, "events"),
    {
      type,
      detail: detail || "",
      createdAt: firestore.serverTimestamp()
    }
  );
}
