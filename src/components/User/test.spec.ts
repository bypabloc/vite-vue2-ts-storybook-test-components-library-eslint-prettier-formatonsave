import Component from './Index.vue'
import { fireEvent, render, screen } from '@testing-library/vue'

test('it should work', () => {
  const { getByText } = render(Component, {
    props: {
      /* ... */
    },
  })

  // get screen.queryByText input name name
  const input = screen.getByRole('input', { name: 'name' })
  window.console.log('input', input)
  expect(screen.queryByText('Mouse Component')).toBeTruthy()
})
