<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import api from '@/http-service.js'
import Dimas from '@/assets/img/dimas.png'
import IsLoading from '@/components/Loading.vue'

const personal = ref({
  name: 'Dimas Bagas Saputro',
  title: 'Frontend Developer',
  email: 'dimaabagas73@gmail.com',
  avatar: Dimas,
  summary:
    "Greetings, my name is Dimas Bagas Saputro, and I hold a Bachelor's degree in Informatics Engineering. I possess a keen interest and am presently dedicating my efforts towards the domains of Frontend Web Development and Backend Web Development.",
})

const experiences = ref([])

const education = ref([])

const certificates = ref([])

const skills = ref([])

const isLoading = ref(true)

onMounted(async () => {
  try {
    // Experiences
    const workData = await api.works.get()

    experiences.value = workData.data.body

    console.log('Work data fetched:', workData)

    // Certificate
    const certificateData = await api.certificates.get()
    certificates.value = certificateData.data.body
    console.log('Certificate data fetched:', certificateData)
    // process certificateData if needed

    // Education
    const eduData = await api.students.get()
    education.value = eduData.data.body
    console.log('Education data fetched:', eduData)

    // Rangkum skill yang ada di education dan experiences
    let skillData = experiences.value.map((exp) => exp.skills).flat()
    skillData = education.value.map((edu) => edu.subjects).flat()
    skills.value = skillData

    isLoading.value = false
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

/* Pagination state for certificates */
const currentPage = ref(1)
/* number of items per page (set to 1 to match the screenshot showing 1/3) */
const itemsPerPage = ref(4)

const totalPages = computed(() =>
  Math.max(1, Math.ceil(certificates.value.length / itemsPerPage.value)),
)

const paginatedCertificates = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return certificates.value.slice(start, start + itemsPerPage.value)
})

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}

/* keep currentPage valid when totalPages changes */
watch(totalPages, (n) => {
  if (currentPage.value > n) currentPage.value = n
})
</script>

<template>
  <div
    class="min-h-[calc(90vh-96px)] bg-gray-900 text-gray-200 flex justify-center items-start p-4 md:p-8"
  >
    <div class="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
      <!-- Left Column: Profile (Sticky) -->
      <aside class="lg:col-span-4 xl:col-span-3 flex flex-col gap-6">
        <div
          class="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 sticky top-24 backdrop-blur-sm"
        >
          <div class="flex flex-col items-center text-center mb-6">
            <div class="relative mb-4 group">
              <div
                class="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/30 transition-all duration-500"
              ></div>
              <img
                :src="personal.avatar"
                alt="avatar"
                class="relative w-32 h-32 rounded-full object-cover border-2 border-gray-700 group-hover:border-accent transition-colors duration-300 shadow-xl"
              />
            </div>
            <h2 class="text-2xl font-bold text-white mb-1 neue tracking-wide">
              {{ personal.name }}
            </h2>
            <p class="text-accent font-medium text-sm mb-3">{{ personal.title }}</p>
            <a
              :href="`mailto:${personal.email}`"
              class="text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-2 bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-700 hover:border-gray-500"
            >
              <i class="pi pi-envelope text-xs"></i>
              {{ personal.email }}
            </a>
          </div>

          <div class="space-y-6">
            <div class="text-sm leading-relaxed text-gray-400 border-t border-gray-700/50 pt-6">
              <p>{{ personal.summary }}</p>
            </div>

            <div class="border-t border-gray-700/50 pt-6">
              <h3
                class="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2"
              >
                <i class="pi pi-bolt text-accent"></i> Skills
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="t of skills"
                  :key="t"
                  class="px-2.5 py-1 text-xs font-medium text-gray-300 bg-gray-900/50 rounded-md border border-gray-700 hover:border-accent/50 hover:text-white transition-all cursor-default"
                >
                  {{ t }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Right Column: Content -->
      <main class="lg:col-span-8 xl:col-span-9 flex flex-col gap-8">
        <!-- Work Experience -->
        <section>
          <h3 class="flex items-center gap-3 text-xl font-bold text-white mb-6">
            <span class="w-8 h-1 bg-accent rounded-full"></span>
            Work Experience
          </h3>

          <div v-if="!isLoading" class="space-y-8 relative pl-4 border-l border-gray-800 ml-3">
            <article v-for="(exp, idx) in experiences" :key="idx" class="relative pl-8 group">
              <!-- Timeline Dot -->
              <div
                class="absolute -left-[24px] top-1.5 w-4 h-4 rounded-full border-2 border-gray-700 bg-gray-900 group-hover:border-accent group-hover:bg-accent transition-all duration-300"
              ></div>

              <div
                class="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300"
              >
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 class="text-lg font-bold text-white">{{ exp.company }}</h4>
                  <span
                    class="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-md border border-accent/20 whitespace-nowrap"
                  >
                    {{ exp.duration }}
                  </span>
                </div>
                <p class="text-gray-300 font-medium mb-3">{{ exp.title }}</p>
                <div class="flex flex-wrap gap-2">
                  <span class="text-xs text-gray-500" v-for="(tg, i) in exp.skills" :key="i"
                    >#{{ tg }}</span
                  >
                </div>
              </div>
            </article>
          </div>
          <div v-else class="flex justify-center py-12">
            <IsLoading />
          </div>
        </section>

        <!-- Education -->
        <section>
          <h3 class="flex items-center gap-3 text-xl font-bold text-white mb-6">
            <span class="w-8 h-1 bg-accent rounded-full"></span>
            Education
          </h3>

          <div v-if="!isLoading" class="space-y-8 relative pl-4 border-l border-gray-800 ml-3">
            <article v-for="(ed, i) in education" :key="i" class="relative pl-8 group">
              <div
                class="absolute -left-[24px] top-1.5 w-4 h-4 rounded-full border-2 border-gray-700 bg-gray-900 group-hover:border-accent group-hover:bg-accent transition-all duration-300"
              ></div>

              <div
                class="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/50 transition-all duration-300"
              >
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 class="text-lg font-bold text-white">{{ ed.company }}</h4>
                  <span
                    class="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded-md border border-accent/20 whitespace-nowrap"
                  >
                    {{ ed.duration }}
                  </span>
                </div>
                <p class="text-gray-300 font-medium mb-3">{{ ed.title }}</p>
                <div class="flex flex-wrap gap-2">
                  <span class="text-xs text-gray-500" v-for="(tg, j) in ed.subjects" :key="j"
                    >#{{ tg }}</span
                  >
                </div>
              </div>
            </article>
          </div>
          <div v-else class="flex justify-center py-12">
            <IsLoading />
          </div>
        </section>

        <!-- Certificates -->
        <section>
          <div class="flex items-center justify-between mb-6">
            <h3 class="flex items-center gap-3 text-xl font-bold text-white">
              <span class="w-8 h-1 bg-accent rounded-full"></span>
              Certificates
            </h3>

            <!-- Pagination Controls -->
            <div class="flex items-center gap-2">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <i class="pi pi-chevron-left text-xs"></i>
              </button>
              <span class="text-xs font-medium text-gray-500 w-12 text-center"
                >{{ currentPage }} / {{ totalPages }}</span
              >
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <i class="pi pi-chevron-right text-xs"></i>
              </button>
            </div>
          </div>

          <div v-if="!isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <article
              v-for="(c, i) in paginatedCertificates"
              :key="`${(currentPage - 1) * itemsPerPage + i}`"
              class="group bg-gray-800/30 rounded-xl p-5 border border-gray-700/50 hover:border-accent/50 hover:bg-gray-800/50 transition-all duration-300 flex flex-col h-full"
            >
              <div class="flex justify-between items-start gap-4 mb-4">
                <div>
                  <h4
                    class="font-bold text-white mb-1 line-clamp-2 group-hover:text-accent transition-colors"
                  >
                    {{ c.title }}
                  </h4>
                  <p class="text-xs text-gray-400">{{ c.issuer }} • {{ c.issue_date }}</p>
                </div>
                <a
                  :href="c.url"
                  target="_blank"
                  class="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-accent group-hover:scale-110 transition-all duration-300 shrink-0"
                >
                  <i class="pi pi-external-link text-xs"></i>
                </a>
              </div>

              <div class="mt-auto pt-4 border-t border-gray-700/30 flex flex-wrap gap-2">
                <span
                  v-for="(tg, k) in c.tags"
                  :key="k"
                  class="text-[10px] uppercase tracking-wider font-medium text-gray-500 bg-gray-900/50 px-2 py-1 rounded border border-gray-800"
                >
                  {{ tg }}
                </span>
              </div>
            </article>
          </div>
          <div v-else class="flex justify-center py-12">
            <IsLoading />
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
