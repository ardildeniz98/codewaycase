<template>
  <div class="login-container">
    <img src="/logo.png" alt="logo" class="logo" />
    <h2>Please sign in</h2>

    <input v-model="email" type="email" placeholder="E-mail address" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="signIn">Sign in</button>

    <p v-if="error" class="error">{{ error }}</p>
    <p class="footer">Codeway © 2021</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth, signInWithEmailAndPassword } from '@/services/firebase';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const signIn = async () => {
  error.value = '';
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem('idToken', token);
    router.push('/');
  } catch (err) {
    error.value = 'Login failed. Check credentials.';
  }
};
</script>

<style scoped src="@/assets/signIn.css"></style>
