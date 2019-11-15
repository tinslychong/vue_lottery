import defaultSettings from '@/settings'

const title = defaultSettings.title || '在线工具箱'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
