<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
  >
    <!-- Icon from Material Line Icons by Vjacheslav Trushkin - https://github.com/cyberalien/line-md/blob/master/license.txt -->
    <g
      fill="none"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <path
        stroke-dasharray="72"
        stroke-dashoffset="72"
        d="M3 14v-9h18v14h-18v-5"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.6s"
          values="72;0"
        />
      </path>
      <path
        stroke-dasharray="24"
        stroke-dashoffset="24"
        stroke-width="1"
        d="M3 16l4 -3l3 2l6 -5l5 4"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          begin="0.6s"
          dur="0.4s"
          values="24;0"
        />
      </path>
    </g>
    <g fill="currentColor" fillOpacity="0">
      <circle cx="7.5" cy="9.5" r="1.5">
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="1s"
          dur="0.2s"
          values="0;1"
        />
      </circle>
      <path d="M3 16l4 -3l3 2l6 -5l5 4V19H3Z">
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="1.3s"
          dur="0.15s"
          values="0;0.3"
        />
      </path>
    </g>
  </svg>
</template>

<script lang="ts">
export default {
  name: 'LineMdImageTwotone',
}
</script>
