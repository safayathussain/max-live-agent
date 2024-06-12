'use client'
import { FetchApi } from '@/utils/FetchApi'
import React from 'react'

const AcceptHostModal = ({ handleActions, host, handleBlockHost, refetch, setActionModalOpen }) => {
    const handleAcceptHost = async () => {
        const d = await FetchApi({ url: `/agency/approveHostHandler/${host._id}`, method: 'post', data: { role: 'AG' },isToast: true, callback: () => {
            refetch()
            setActionModalOpen(false)
        }  })
    }
    return (
        <div>
            <div className="flex items-center gap-2">
                <button onClick={() => handleActions(handleBlockHost, 'decline this host?')} className=" bg-error px-6 mt-2 w-full py-2 rounded-lg text-white font-semibold">
                    Decline
                </button>
                <button onClick={() => handleActions(handleAcceptHost, 'accept this host?')} className=" bg-success px-6 mt-2 w-full py-2 rounded-lg text-white font-semibold">
                    Accept
                </button>
            </div>
        </div>
    )
}

export default AcceptHostModal