import fs from 'fs'

const flagFiles = fs.readdirSync('public/images/Flags')

fs.writeFileSync('public/Data/flag-icons.json', JSON.stringify(flagFiles, null, 2))