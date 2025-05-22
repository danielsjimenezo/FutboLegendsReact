import { useEffect, useRef, useState } from "react"
import { getArrayFromLocalStorage } from "../../utilities/utilities.js"
import SortableItem from "./SortableItem.jsx"
import {
    DndContext,
    closestCenter,
    useSensors,
    useSensor,
    PointerSensor,
    KeyboardSensor,
} from "@dnd-kit/core"
import {
    SortableContext,
    verticalListSortingStrategy,
    sortableKeyboardCoordinates,
    arrayMove
} from "@dnd-kit/sortable"
import { useSelector } from "react-redux"
import { selectPlayerState } from "../../context/playerSlice.js"


function getMyTopPlayers() {
    let players =  getArrayFromLocalStorage('futboLegends-myTopPlayers', [])
    if (players.length < 20) {
        let remaining = 20 - players.length
        console.log({length: players.length, remaining})
        for (let i = 0; i < remaining; i++) {
            players.push({
                id: Math.random()
            })
        }
    } else if (players.length > 20) {
        players = players.slice(0, 20)
    }
    return players
}

function MyTop20() {

    const { players } = useSelector(selectPlayerState)

    // Initialize MY RANKINGS states
    const [myTopPlayers, setMyTopPlayers] = useState(getMyTopPlayers())
    const [mySearchTerm, setMySearchTerm] = useState("")
    const [mySearchResults, setMySearchResults] = useState([])
    const [myReplaceIndex, setMyReplaceIndex] = useState(0)
    const [showMyResults, setShowMyResults] = useState(false)

    const myResultsRef = useRef(null)

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                myResultsRef.current &&
                !myResultsRef.current.contains(event.target)
            ) {
                setShowMyResults(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Auto save myTopPlayers
    useEffect(()=>{
        localStorage.setItem('futboLegends-myTopPlayers', JSON.stringify(myTopPlayers))
    }, [myTopPlayers])

    // Set up sensors for drag detection - separate for each section
    const myDragSensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    )

    // MY RANKINGS search functionality
    const handleMySearch = (e) => {
        const term = e.target.value
        setMySearchTerm(term)

        if (term.length >= 2) {
            const results = players.filter((player) =>
                player.name.toLowerCase().includes(term.toLowerCase())
            )
            setMySearchResults(results)
            setShowMyResults(true)
        } else {
            setMySearchResults([])
            setShowMyResults(false)
        }
    }

    // Handle selection from MY search results
    const handleSelectMyPlayer = (player) => {
        // Replace player at current index
        const newPlayers = [...myTopPlayers]

        // Check if already exists, and if it does, move instead
        console.log({ newPlayers, player })
        const existingIndex = newPlayers.findIndex(
            (p) => p.name === player.name
        )
        if (existingIndex !== -1) {
            // Move player
            newPlayers.splice(existingIndex, 1)
            newPlayers.splice(myReplaceIndex, 0, player)
            setMyTopPlayers(newPlayers)
        } else {
            // Add player
            newPlayers[myReplaceIndex] = player
            setMyTopPlayers(newPlayers)
        }

        setMySearchTerm("")
        setMySearchResults([])
        setShowMyResults(false)

        // Increment index for next selection, cycle back to 0 if at end
        setMyReplaceIndex((prevIndex) => (prevIndex + 1) % 20)
    }

    // Handle drag end for MY RANKINGS
    const handleMyDragEnd = (event) => {
        const { active, over } = event

        if (active && over && active.id !== over.id) {
            setMyTopPlayers((items) => {
                const oldIndex = items.findIndex((item) => item.name === active.id)
                const newIndex = items.findIndex((item) => item.name === over.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    return (
        <section className="rankings-section editable-rankings">
            <div className="section-header">
                <h2>My Top 20</h2>
                <div className="search-container" ref={myResultsRef}>
                    <input
                        type="text"
                        placeholder={`Search to replace #${myReplaceIndex + 1}...`}
                        value={mySearchTerm}
                        onChange={handleMySearch}
                        className="search-input"
                    />
                    {showMyResults && mySearchResults.length > 0 && (
                        <ul className="search-results">
                            {mySearchResults.map((player) => player?.name ? (
                                <li
                                    key={player.name}
                                    onClick={() => handleSelectMyPlayer(player)}
                                >
                                    {player.name}
                                </li>
                            ) : (
                                <li key={player.id}>
                                    PLAYER HERE
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <DndContext
                sensors={myDragSensors}
                collisionDetection={closestCenter}
                onDragEnd={handleMyDragEnd}
            >
                <SortableContext
                    items={myTopPlayers.map((player) => player?.name || player.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="rankings-list">
                        {myTopPlayers.map((player, index) => player.name ? (
                            <SortableItem
                                key={player.name}
                                id={player.name}
                                index={index}
                                name={player.name}
                            />
                        ) : (
                            <div key={player.id} className="ranking-item not-chosen">
                                <span className="ranking-number">{index + 1}</span>
                                <img src="/images/Icons/person.png" alt="person" />
                                <span>Not chosen</span>
                            </div>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </section>
    )
}

export default MyTop20