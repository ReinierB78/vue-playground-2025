<template>
  <div class="bg-gray-800">
    <div class="max-w-6xl mx-auto px-4 py-10">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="mb-5">
          <h2 class="text-white font-bold text-xl mb-4">Company</h2>
          <p class="text-gray-400 text-sm">
            Making the world a better place through constructing elegant hierarchies.
          </p>
        </div>

        <!-- Solutions -->
        <div class="mb-5">
          <h2 class="text-white font-bold text-xl mb-4">Solutions</h2>
          <ul class="text-gray-400">
            <li class="mb-2">
              <a href="#" class="hover:text-white transition duration-300">Marketing</a>
            </li>
            <li class="mb-2">
              <a href="#" class="hover:text-white transition duration-300">Analytics</a>
            </li>
            <li class="mb-2">
              <a href="#" class="hover:text-white transition duration-300">Commerce</a>
            </li>
            <li class="mb-2">
              <a href="#" class="hover:text-white transition duration-300">Insights</a>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div class="mb-5">
          <h2 class="text-white font-bold text-xl mb-4">Support</h2>
          <ul class="text-gray-400">
            <li class="mb-2">
              <a href="#" class="hover:text-white transition duration-300">Pricing</a>
            </li>
            <li class="mb-2">
              <a href="#" class="hover:text-white transition duration-300">Documentation</a>
            </li>
            <li class="mb-2">
              <a href="#" class="hover:text-white transition duration-300">Guides</a>
            </li>
            <li class="mb-2">
              <a href="#" class="hover:text-white transition duration-300">API Status</a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="mb-5">
          <h2 class="text-white font-bold text-xl mb-4">Contact</h2>
          <ul class="text-gray-400">
            <li class="mb-2">
              <a href="mailto:contact@example.com" class="hover:text-white transition duration-300">
                contact@example.com
              </a>
            </li>
            <li class="mb-2">
              <a href="tel:+11234567890" class="hover:text-white transition duration-300">
                +1 (123) 456-7890
              </a>
            </li>
            <li class="text-sm">
              123 Street Name<br />
              City, State 12345<br />
              Country
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="pt-8 mt-8 border-t border-gray-700 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center"
      >
        <div class="mb-4 md:mb-0">© {{ currentYear }} Your Company. All rights reserved.</div>
        <div class="flex space-x-6">
          <a href="#" class="hover:text-white transition duration-300">Privacy Policy</a>
          <a href="#" class="hover:text-white transition duration-300">Terms of Service</a>
          <a href="#" class="hover:text-white transition duration-300">Cookie Policy</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
