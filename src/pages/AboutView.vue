<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import WorkService from '@/service/model/Work.js'
import CertificateService from '@/service/model/Certificate'
import StudentService from '@/service/model/Student'
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

const education = ref([
  {
    school: 'Telkom University',
    degree: 'Bachelor of Informatics Engineering',
    period: '2022 - 2024',
    tags: ['Python', 'Machine Learning', 'Firebase', 'Microsoft Office', 'Computer Science'],
  },
  {
    school: 'Telkom University',
    degree: 'Diploma of Education, Informatics',
    period: '2019 - 2022',
    tags: ['MySQL', 'CodeIgniter', 'PHP', 'Java', 'Kotlin', 'Android', 'Web Development'],
  },
])

const certificates = ref([])

const skills = ref([])

const isLoading = ref(true)

onMounted(async () => {
  try {
    // Experiences
    const workData = await WorkService.getAll()

    experiences.value = workData.data[0]
    experiences.value = workData.data.flat()

    console.log('Work data fetched:', workData)

    // Certificate
    const certificateData = await CertificateService.getAll()
    certificates.value = certificateData.data[0]
    certificates.value = certificateData.data.flat()
    console.log('Certificate data fetched:', certificateData)
    // process certificateData if needed

    // Education
    const eduData = await StudentService.getAll()
    education.value = eduData.data[0]
    education.value = eduData.data.flat()
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
  <div class="min-h-[calc(90vh-96px)] bg-accent/5 flex justify-center items-start">
    <div
      class="w-full clip-animate bg-accent/95 text-gray-200 shadow-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <!-- Left column: profile -->
      <aside class="col-span-1 flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <img
            :src="personal.avatar"
            alt="avatar"
            class="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-white"
          />
          <div>
            <h2 class="text-2xl font-bold">{{ personal.name }}</h2>
            <p class="text-white text-sm mt-1">{{ personal.title }}</p>
            <a
              :href="`mailto:${personal.email}`"
              class="block text-xs text-gray-300 mt-2 hover:underline"
              >{{ personal.email }}</a
            >
          </div>
        </div>

        <div class="bg-accent/90 p-4 rounded-lg text-sm leading-relaxed">
          <p>{{ personal.summary }}</p>
        </div>

        <div class="bg-accent/90 p-4 rounded-lg">
          <h3 class="flex items-center gap-2 text-lg font-semibold mb-3">
            <span
              class="w-6 h-6 flex items-center justify-center bg-accent/30 rounded-full text-black text-sm"
              >i</span
            >
            Skills
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              class="tag"
              v-for="t of skills"
              :key="t"
              >{{ t }}</span
            >
          </div>
        </div>
      </aside>

      <!-- Right column: sections -->
      <main class="col-span-2 flex flex-col gap-6">
        <!-- Work Experience -->
        <section class="bg-accent/90 p-4 rounded-lg">
          <div class="section-header">
            <h3>Work Experience</h3>
          </div>
          <!--    Work Data      -->
          <div v-if="!isLoading" class="mt-4 space-y-4">
            <article v-for="(exp, idx) in experiences" :key="idx" class="flex gap-4">
              <div class="w-3 flex flex-col items-center">
                <div class="dot" />
                <div class="line" v-if="idx !== experiences.length - 1" />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h4 class="font-semibold">{{ exp.company }}</h4>
                  <span class="text-sm text-gray-300">{{ exp.duration }}</span>
                </div>
                <p class="text-sm text-gray-300">{{ exp.title }}</p>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span class="tag" v-for="(tg, i) in exp.skills" :key="i">{{ tg }}</span>
                </div>
              </div>
            </article>
          </div>
          <div v-else class="flex justify-center">
            <IsLoading class="flex justify-center" />
          </div>
        </section>

        <!-- Education -->
        <section class="bg-accent/90 p-4 rounded-lg">
          <div class="section-header">
            <h3>Education</h3>
          </div>
          <!--    Edu Data      -->
          <div v-if="!isLoading" class="mt-4 space-y-4">
            <article v-for="(ed, i) in education" :key="i" class="flex gap-4">
              <div class="w-3 flex flex-col items-center">
                <div class="dot" />
                <div class="line" v-if="i !== education.length - 1" />
              </div>
              <div class="flex-1">
                <div class="flex items-center justify-between">
                  <h4 class="font-semibold">{{ ed.company }}</h4>
                  <span class="text-sm text-gray-300">{{ ed.duration }}</span>
                </div>
                <p class="text-sm text-gray-300">{{ ed.title }}</p>
                <div class="mt-2 flex flex-wrap gap-2">
                  <span class="tag" v-for="(tg, j) in ed.subjects" :key="j">{{ tg }}</span>
                </div>
              </div>
            </article>
          </div>
          <div v-else class="flex justify-center">
            <IsLoading class="flex justify-center" />
          </div>
        </section>

        <!-- Certificates (paginated) -->
        <section class="bg-accent/90 p-4 rounded-lg relative">
          <div class="section-header">
            <h3>Certificates</h3>
          </div>
          <!--    Certif Data      -->
          <div v-if="!isLoading" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <article
              v-for="(c, i) in paginatedCertificates"
              :key="`${(currentPage - 1) * itemsPerPage + i}`"
              class="p-3 bg-accent/92 rounded-md"
            >
              <div class="flex items-start justify-between gap-2">
                <div>
                  <div>
                    <h4 class="font-semibold">{{ c.title }}</h4>
                    <p class="text-sm text-gray-300">
                      {{ c.issuer }} •
                      <span class="text-xs"
                        >{{ c.issue_date }} - {{ c.expiry_date ? c.expiry_date : 'Present' }}</span
                      >
                    </p>
                  </div>
                  <a :href="c.url" class="tag mt-2"
                    >Credential <i class="pi pi-external-link"></i
                  ></a>
                </div>

                <svg
                  class="w-6 h-6 text-accent shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M9 12l2 2 4-4"
                  />
                  <circle cx="12" cy="12" r="9" stroke-width="1.5" />
                </svg>
              </div>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="tag" v-for="(tg, k) in c.tags" :key="k">{{ tg }}</span>
              </div>
            </article>
          </div>
          <div v-else class="flex justify-center">
            <IsLoading class="flex justify-center" />
          </div>

          <!-- pagination controls -->
          <div class="mt-4 flex items-center justify-end gap-3">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="w-8 h-8 rounded-full flex items-center justify-center bg-accent/10 hover:bg-accent/20 disabled:opacity-40"
              title="Previous"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15 18l-6-6 6-6"
                />
              </svg>
            </button>

            <div class="text-sm text-gray-300 select-none">
              {{ currentPage }} / {{ totalPages }}
            </div>

            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="w-8 h-8 rounded-full flex items-center justify-center bg-accent/10 hover:bg-accent/20 disabled:opacity-40"
              title="Next"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9 6l6 6-6 6"
                />
              </svg>
            </button>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.clip-animate {
  animation: clip-anim 600ms ease-out forwards;
}

/* clip animation */
@keyframes clip-anim {
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
}

/* small UI helpers */
/* gunakan variable --accent jika tersedia, fallback ke warna hijau lama */
.tag {
  display: inline-block;
  background: rgba(255, 187, 0, 0.59);
  color: var(--accent-text, #714801);
  padding: 0.25rem 0.5rem;
  border-radius: 999px;
  font-size: 0.75rem;
  border: 1px solid rgba(255, 187, 0, 0.12);
}

/* timeline markers */
.dot {
  width: 10px;
  height: 10px;
  background: var(--accent, #ab6d02);
  border-radius: 999px;
  margin-top: 4px;
}
.line {
  width: 2px;
  background: rgba(255, 187, 0, 0.621);
  flex: 1;
  margin-top: 4px;
  margin-bottom: 4px;
}

/* section header */
.section-header h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: #d1fae5;
}
.section-header h3::before {
  content: '✦';
  color: var(--accent, #ab6d02);
  font-size: 0.9rem;
  margin-right: 0.5rem;
}
</style>
