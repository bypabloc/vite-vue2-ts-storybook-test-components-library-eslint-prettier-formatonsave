<template>
  <div>
    <TitleComponent type="title-1">
      Texto prueba
    </TitleComponent>
    <SubTitleComponent type="subtitle-3">
      Texto prueba 2
    </SubTitleComponent>
    <Paragraph type="caption">
      Texto prueba 3
    </Paragraph>
  </div>
</template>

<script setup lang="ts">
import TitleComponent from '@/components/Title/Index.vue'
import SubTitleComponent from '@/components/SubTitle/Index.vue'
import Paragraph from '@/components/Paragraph/Index.vue'
</script>
