<script setup>
import { ref, onMounted } from 'vue';

// State untuk memicu transisi
const isRevealed = ref(false);

// Memecah kata menjadi array huruf untuk di-loop di template
const portfolioChars = 'Portfolio'.split('');
const dateChars = '2025 - 2026'.split('');

// Setelah komponen dimuat, picu transisi setelah jeda singkat
onMounted(() => {
  setTimeout(() => {
    isRevealed.value = true;
  }, 100);
});
</script>

<template>
  <div class="relative h-screen w-full overflow-hidden bg-white">

    <!--
      Lapisan 1: Teks (di depan, z-20)
      Teks akan berubah warna dan layout saat 'isRevealed' true.
    -->
    <div
      class="absolute inset-0 z-20 flex flex-col items-center justify-center transition-colors duration-1000"
      :class="isRevealed ? 'text-gray-900' : 'text-gray-200'"
    >
      <!-- Wrapper untuk kata "Portfolio" -->
      <h1 class="text-9xl font-bold relative h-[1em] w-full flex justify-center items-center">
        <!-- Setiap huruf adalah <span> yang diposisikan secara absolut -->
        <span
          v-for="(letter, index) in portfolioChars"
          :key="`p-${index}`"
          class="letter"
          :class="{ revealed: isRevealed }"
          :style="{
            '--i': index,
            '--total': portfolioChars.length,
            'transition-delay': `${index * 50}ms`
          }"
        >
          {{ letter }}
        </span>
      </h1>

      <!-- Wrapper untuk tanggal "2025 - 2026" -->
      <p class="text-5xl font-bold relative mt-4 h-[1em] w-full flex justify-center items-center">
        <span
          v-for="(letter, index) in dateChars"
          :key="`d-${index}`"
          class="letter"
          :class="{ revealed: isRevealed }"
          :style="{
            '--i': index,
            '--total': dateChars.length,
            'transition-delay': `${(portfolioChars.length + index) * 40}ms`
          }"
        >
          {{ letter }}
        </span>
      </p>
    </div>

    <!--
      Lapisan 2: Panel Abu-abu (di belakang, z-10)
      Panel ini akan bergeser ke atas.
    -->
    <div
      class="absolute inset-0 z-10 h-full w-full bg-gray-700 transition-transform duration-1000 ease-in-out"
      :class="{ '-translate-y-full': isRevealed }"
    ></div>

  </div>
</template>

<style scoped>
.letter {
  position: absolute;
  top: 50%;
  left: 50%;
  /* Transisi yang 'bouncy' untuk efek yang lebih dinamis */
  transition: transform 1s cubic-bezier(0.68, -0.55, 0.27, 1.55);

  /* Posisi Awal (Horizontal):
    Menghitung posisi horizontal setiap huruf.
    Rumus ini menyebarkan huruf dari titik tengah berdasarkan indeksnya (--i).
    'ch' adalah unit lebar karakter, ideal untuk layout horizontal.
  */
  transform:
    translateX(calc((var(--i) - (var(--total) - 1) / 2) * 0.75ch))
    translateY(-50%);
}

.letter.revealed {
  /* Posisi Akhir (Vertikal):
    Mengubah transformasi untuk menumpuk huruf secara vertikal.
    'em' adalah unit tinggi font, ideal untuk layout vertikal.
  */
  transform:
    translateY(calc((var(--i) - (var(--total) - 1) / 2) * 1.1em))
    translateX(-50%);
}
</style>

