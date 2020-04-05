<script>
  import { tweened } from 'svelte/motion'
  import { cubicIn } from 'svelte/easing'

  const progress = tweened(0, {
    delay: 0,
    duration: 10000,
    easing: cubicIn,
  })
  var progressValue

  progress.subscribe(value => {
    progressValue = value
  })

  $: console.log('$$$$ progressValue', progressValue)

  setTimeout(() => {
    progress.set(1)
  }, 1500)
</script>

<progress value={progressValue} />
