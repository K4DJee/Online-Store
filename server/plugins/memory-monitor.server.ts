import fs from 'fs'
import path from 'path'
import os from 'os'
import heapdump from 'heapdump'

export default defineNitroPlugin(() => {
    const interval = setInterval(() => {
        const memory = process.memoryUsage()
        const formatted = {
            'Heap Used': `${(memory.heapUsed / 1024 / 1024).toFixed(2)} MB`,
            RSS: `${(memory.rss / 1024 / 1024).toFixed(2)} MB`,
        }
        console.log('[Memory Monitor]', formatted)

        if (memory.rss > 2024 * 1024 * 1024) {
            // Используем системную временную папку
            const dumpsDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nuxt-heapdumps-'))
            const filename = `nuxt_heapdump_${Date.now()}.heapsnapshot`
            const filepath = path.join(dumpsDir, filename)

            console.log('Writing heapdump to:', filepath)

            try {
                heapdump.writeSnapshot(filepath, (err, fullPath) => {
                    if (err) {
                        console.error('Heapdump write error:', err)
                    } else {
                        console.log(`Heapdump saved to: ${fullPath}`)
                    }
                })
            } catch (err) {
                console.error('Heapdump failed:', err)
            }
        }
    }, 5000)
})