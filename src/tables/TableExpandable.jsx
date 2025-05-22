// @ts-check

import React from "react";

import YoutubeEmbed from "../misc/YoutubeEmbed.jsx";


/**
 * @typedef PhotosExpandableItem
 * @property {string} title
 * @property {string} src
 */

/**
 * @typedef PhotosExpandable
 * @property {"photos"} type
 * @property {PhotosExpandableItem[]} items
 */

 /**
 * @typedef VideosExpandableItem
 * @property {string} title
 * @property {string} embedCode
 * @property {string} channel
 */

/**
 * @typedef VideosExpandable
 * @property {"videos"} type
 * @property {VideosExpandableItem[]} items
 */

/**
 * @typedef MoreRowsExpandable
 * @property {"moreRows"} type
 * @property {any[][]} items
 */

/**
 * @typedef {PhotosExpandable | VideosExpandable | MoreRowsExpandable } Expandable
 */

/**
 * @typedef ExpandableProps
 * @property {Expandable} expandable
 */

/**
 * @param {ExpandableProps} param0 
 * @returns 
 */
function TableExpandable({ expandable }) {
    return (
        <>
            {expandable.type === 'photos' && (
                <tr>
                    <td colSpan={100}>
                        <div className="photos-expandable expandable" style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${expandable.items.length}, 1fr)`
                        }}>
                            {expandable.items.map(item => (
                                <div key={Math.random()} className="photos-expandable-item">
                                    <h4>{item.title}</h4>
                                    <img src={item.src} alt="" />
                                </div>
                            ))}
                        </div>
                    </td>
                </tr>
            )}

            {expandable.type === 'videos' && (
                <tr>
                    <td colSpan={100}>
                        <div className="videos-expandable expandable" style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${expandable.items.length}, 1fr)`,
                            gap: '2rem'
                        }}>
                            {expandable.items.map(item => (
                                <div key={Math.random()} className="videos-expandable-item">
                                    <div className="heading" style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 150px',
                                        alignItems: 'baseline'
                                    }}>
                                        <h4 style={{ textAlign: 'left'}}>{item.title}</h4>
                                        <p style={{ textAlign: 'right' }}>{item.channel}</p>
                                    </div>
                                    <YoutubeEmbed embedCode={item.embedCode} />
                                </div>
                            ))}
                        </div>
                    </td>
                </tr>
            )}

            {expandable.type === 'moreRows' && expandable.items.map(row => (
                <tr key={Math.random()}>
                    {row.map(item => (
                        <td key={Math.random()}>
                            {item}
                        </td>
                    ))}
                </tr>
            ))}


        </>
    )
}

export default TableExpandable;