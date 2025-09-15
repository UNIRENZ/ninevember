<template>
  <div class="p-6 text-center">
    <!-- ถ้าตอบผิดให้แสดงข้อความแทนคำถาม -->
     <transition name="fade-slide" mode="out-in">
    <div v-if="!showQuestion" :key="currentWrongIndex">
      <h2 class="text-xl font-bold mb-4">
        {{ wrong[currentWrongIndex].question }}
      </h2>
      <div class="space-y-2">
        <button
          v-for="(choice, index) in wrong[currentWrongIndex].choices"
          :key="index"
          @click="checkWrong(choice)"
          class="block w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          {{ choice }}
        </button>
      </div>
    </div>
    
    <!-- แสดงคำถามถ้า showQuestion = true -->
    <div v-else :key="currentQuestionIndex">
      <h2 class="text-xl font-bold mb-4">
        {{ questions[currentQuestionIndex].question }}
      </h2>

      <div class="space-y-2">
        <button
          v-for="(choice, index) in questions[currentQuestionIndex].choices"
          :key="index"
          @click="checkAnswer(choice)"
          class="block w-full px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          {{ choice }}
        </button>
      </div>
    </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const questions = ref([
  {
    question: 'ยินดีต้อนรับ',
    choices: ['->'],
    answer: '->',
  },
  {
    question: 'นี่คือแบบทดสอบรอบด้านง่ายๆ',
    choices: ['->'],
    answer: '->',
  },
  {
    question: 'พร้อมที่จะเริ่มแล้วใช่มั้ย',
    choices: ['พร้อมแล้ว', 'ยังไม่พร้อม'],
    answer: 'พร้อมแล้ว',
  },
  {
    question: 'ดีมาก...งั้นมาเริ่มกันเลย',
    choices: ['->'],
    answer: '->',
  },
])

const wrong = ref([
  {
    question: 'ทำไมล่ะ',
    choices: ['->'],
    answer: '->',
  },
  {
    question: 'งั้นเอาใหม่นะ',
    choices: ['->'],
    answer: '->',
  }
])

const currentQuestionIndex = ref(0)
const currentWrongIndex = ref(0)
const showQuestion = ref(true) // ถ้า false จะซ่อนคำถามและโชว์ข้อความผิด

// ตรวจคำตอบ
const checkAnswer = (choice) => {
  const correctAnswer = questions.value[currentQuestionIndex.value].answer

  if (choice === correctAnswer) {
    // ถ้าตอบถูกไปข้อถัดไป
    if (currentQuestionIndex.value < questions.value.length - 1) {
      currentQuestionIndex.value++
    } else {
      alert('🎉 คุณตอบครบทุกข้อแล้ว!')
    }
  } else {
    // ถ้าตอบผิด ซ่อนคำถาม
    showQuestion.value = false
  }
}

const checkWrong = (choice) => {
  const correctAnswer = wrong.value[currentWrongIndex.value].answer

  if (choice === correctAnswer) {
    // ถ้าตอบถูกไปข้อถัดไป
    if (currentWrongIndex.value < wrong.value.length - 1) {
      currentWrongIndex.value++
    } else {
      showQuestion.value = true
      currentWrongIndex.value = 0
    }
  } else {
    // ถ้าตอบผิด ซ่อนคำถาม
    showQuestion.value = false
  }
}

// รีเซ็ตให้คำถามกลับมา
const resetQuestion = () => {
  showQuestion.value = true
}
</script>


<style>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>