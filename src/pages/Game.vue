<template>
  <div class="p-6 text-center">
    <!-- ถ้าตอบผิดให้แสดงข้อความแทนคำถาม -->
     <transition name="fade-slide" mode="out-in">
    <div v-if="!showQuestion" class="mt-6">
      <p class="text-red-600 text-xl font-bold mb-4">
        แน่ใจแล้วหรอ
      </p>
      <button
        @click="resetQuestion"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        🔄 ลองอีกครั้ง
      </button>
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
    question: '2 + 2 เท่ากับเท่าไหร่?',
    choices: ['3', '4', '5'],
    answer: '4',
  },
  {
    question: 'เมืองหลวงของประเทศไทยคือ?',
    choices: ['เชียงใหม่', 'กรุงเทพฯ', 'ขอนแก่น'],
    answer: 'กรุงเทพฯ',
  },
])

const currentQuestionIndex = ref(0)
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