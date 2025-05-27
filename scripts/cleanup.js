export default function cleanup(players) {
    console.log("Cleaning up...")
    players.forEach(p => {
        delete p[""]
        delete p["__1"]
        p.active = p.active === "TRUE"
    })
}