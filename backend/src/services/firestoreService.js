const admin = require("firebase-admin");
const db = admin.firestore();

const getAllConfigs = async () => {
    const snapshot = await db.collection("configs").get();
    return snapshot.docs.map(doc => doc.data());
};

const addConfigParam = async ({ key, value, description }) => {
    const docRef = db.collection("configs").doc(key);
    const doc = await docRef.get();

    if (doc.exists) throw new Error("Key already exists");

    let parsedValue = value;
    if (!isNaN(value) && value.trim() !== '') {
        parsedValue = Number(value);
    }

    await docRef.set({
        key,
        value: parsedValue,
        description,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
};

const updateConfigParam = async (key, { value, description }) => {
    const docRef = db.collection("configs").doc(key);
    const doc = await docRef.get();

    if (!doc.exists) throw new Error("Key does not exist");

    await docRef.update({
        value,
        description
    });
};

const deleteConfigParam = async (key) => {
    const docRef = db.collection("configs").doc(key);
    const doc = await docRef.get();

    if (!doc.exists) throw new Error("Key does not exist");

    await docRef.delete();
};

const getAllConfigsMap = async () => {
    const snapshot = await db.collection("configs").get();
    const config = {};
    snapshot.docs.forEach(doc => {
        const data = doc.data();
        config[data.key] = data.value;
    });
    return config;
};

module.exports = {
    getAllConfigs,
    addConfigParam,
    updateConfigParam,
    deleteConfigParam,
    getAllConfigsMap
};
