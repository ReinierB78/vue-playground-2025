import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import HomeView from './HomeView.vue'

describe('HomeView page', () => {
  it('should render with at least one joke', () => {
    const wrapper = mount(HomeView)
    expect(wrapper.text()).toContain('Let me tell you a joke')
  })
})
