<template>
  <div :class="`text--${props.type}`"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Title',
})
</script>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: 'hero',
    validator(value: string) {
      // The value must match one of these strings
      return ['hero', 'title-1', 'title--2'].includes(value)
    }
  },
})
</script>

<style lang="scss" scoped>
@import '@/assets/colors.scss';

$prefix: 'text--';

$font-family: 'Source Sans Pro', 'Arial';

// Typography
// Figma https://www.figma.com/file/rmgtS2rcD8oQxqTHDQFctz/%F0%9F%A7%B1-Base?type=design&node-id=104-3&t=muBrpGkRpm4u62iU-0
$typographies: (
  'hero': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 60px,
    'font-style': normal,
    'line-height': 75px,
    'letter-spacing': -0.5px,
  ),
  'title-1': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 48px,
    'font-style': normal,
    'line-height': 60px,
  ),
  'title-2': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 34px,
    'font-style': normal,
    'line-height': 43px,
  ),
  'subtitle-1': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 24px,
    'font-style': normal,
    'line-height': 30px,
    'letter-spacing': 0.18px,
  ),
  'subtitle-2': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 20px,
    'font-style': normal,
    'line-height': 25px,
    'letter-spacing': 0.15px,
  ),
  'subtitle-3': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 18px,
    'font-style': normal,
    'line-height': 23px,
    'letter-spacing': 0.15px,
  ),
  'body': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 16px,
    'font-style': normal,
    'line-height': 23px,
    'letter-spacing': 0.15px,
  ),
  'caption': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 14px,
    'font-style': normal,
    'line-height': 20px,
    'letter-spacing': 0.4px,
  ),
  'button': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 14px,
    'font-style': normal,
    'line-height': 16px,
    'letter-spacing': 1.25px,
    'text-transform': uppercase,
  ),
  'link': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 16px,
    'font-style': normal,
    'line-height': 24px,
    'text-decoration-line': underline,
  ),
  'link-small': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 14px,
    'font-style': normal,
    'line-height': 24px,
    'text-decoration-line': underline,
  ),
  'aux-help': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 12px,
    'font-style': normal,
    'line-height': 15px,
    'letter-spacing': 0.4px,
  ),
  'mini-desktop': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 12px,
    'font-style': normal,
    'line-height': 15px,
    'letter-spacing': 2px,
    'text-transform': uppercase,
  ),
  'mini-mobile': (
    'font-family': $font-family,
    'color': map-get($colors, 'oxford'),
    'font-size': 10px,
    'font-style': normal,
    'line-height': 13px,
    'letter-spacing': 2px,
    'text-transform': uppercase,
  ),
);

@each $name, $style in $typographies {
  .#{$prefix}#{$name} {
    font-family: map-get($style, 'font-family');
    color: map-get($style, 'color');
    font-size: map-get($style, 'font-size');
    font-style: map-get($style, 'font-style');
    line-height: map-get($style, 'line-height');
    letter-spacing: map-get($style, 'letter-spacing');
    text-transform: map-get($style, 'text-transform');
    text-decoration-line: map-get($style, 'text-decoration-line');
  }
}


// Font weights
$weights: (
  'regular': (
    'font-style': normal,
    'font-weight': 400,
  ),
  'italic-regular': (
    'font-style': italic,
    'font-weight': 400,
  ),
  'medium': (
    'font-style': normal,
    'font-weight': 600,
  ),
  'italic-medium': (
    'font-style': italic,
    'font-weight': 600,
  ),
  'bold': (
    'font-style': normal,
    'font-weight': 700,
  ),
  'italic-bold': (
    'font-style': italic,
    'font-weight': 700,
  ),
  'semi-bold': (
    'font-style': normal,
    'font-weight': 600,
  ),
  'italic-semi-bold': (
    'font-style': italic,
    'font-weight': 600,
  ),
);

@each $name, $style in $weights {
  .#{$prefix}#{$name} {
    font-style: map-get($style, 'font-style') !important;
    font-weight: map-get($style, 'font-weight') !important;
  }
}

</style>
