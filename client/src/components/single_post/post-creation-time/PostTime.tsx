import React from 'react'

function PostTime(day: number, hour: number, minute: number) {
    if (hour !== 0 || day !== 0 || minute !== 0) {
        if (day >= 1) {
            if (day === 1) {
                return <p className="post-time">{day} day ago</p>
            } else {
                return <p className="post-time">{day} days ago</p>
            }
        } else if (hour >= 1) {
            if (hour === 1) {
                return <p className="post-time">{hour} hour ago</p>
            } else {
                return <p className="post-time">{hour} hours ago</p>
            }
        } else {
            if (minute === 1) {
                return <p className="post-time">{minute} minute ago</p>
            } else {
                return <p className="post-time">{minute} minutes ago</p>
            }
        }
    } else {
        return <p className="post-time">now</p>
    }
}

export default PostTime