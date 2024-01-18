<template>
  <nav class="bg-zinc-100 dark:bg-zinc-800 flex flex-col gap-2 rounded-lg py-4">
    <DashboardMenuLink
      href="/dashboard/"
      title="My Images"
      iconName="i-heroicons-photo"
    />
    <DashboardMenuLink
      href="/dashboard/upload/"
      title="Upload New Image"
      iconName="i-heroicons-arrow-down-tray"
    />
    <DashboardMenuLink
      href="/dashboard/settings/"
      title="Settings"
      iconName="i-heroicons-adjustments-horizontal"
    />
    <DashboardMenuLink
      href="/auth/logout/"
      title="Log Out"
      iconName="i-heroicons-arrow-left-start-on-rectangle-20-solid"
    />
  </nav>
</template>