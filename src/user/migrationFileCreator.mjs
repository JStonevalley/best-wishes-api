import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const wishes = require('./bestwishes_wish.json')
const wishLists = require('./bestwishes_wishList.json')
import { writeFileSync } from 'fs'
import { join } from 'path'

const create = () => {
  const migration = wishLists
    .filter((wishList) => wishList.wishIds?.length > 0)
    .reduce((acc, { owner, removedAt, title, wishIds }) => {
      const wishesForList = wishIds
        .map((id) => wishes.find((wish) => wish.id === id))
        .filter(Boolean)
        .map(({ title, body, image, link, price }) => ({
          title,
          description: body,
          quantity: 1,
          image,
          link,
          price: price ? { amount: price * 100, currency: 'SEK' } : undefined,
        }))
      const archivedAt = removedAt ? new Date(removedAt.epoch_time * 1000).toISOString() : null
      acc[owner] = [...(acc[owner] || []), { headline: title, archivedAt, wishes: wishesForList }]
      return acc
    }, {})
  writeFileSync(join('src', 'user', 'migration.json'), JSON.stringify(migration, null, 2))
}

create()
