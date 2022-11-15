import Image from 'next/image'
import React, { FC } from 'react'

// type NftObj = {
//     contract : { address : string},
//     description : string,
//     media : any[],
//     title : string
// }
interface NftCardProps {
    contract : { address : string},
    description : string,
    media : any[],
    title : string
}

const NFTCARDS : FC<NftCardProps> = ({ title, description, media, contract }) => {
    const nftImage = media[0].raw;
  return (
    <div className='w-1/4 flex flex-col'>
        <div className="rounded-md">
            <Image loader={() => nftImage} src={nftImage} width={200} height={200} alt="ntf-image" className='w-full h-300'/>
        </div>
        <div className="flex flex-col bg-slate-100 rounded-b-md py-3 px-2">
            <h2 className='font-bold text-xl my-2 text-grey-800'>{title}</h2>
            <p className='text-grey-800 mb-3'>{`${description?.substring(0, 160)} ...`}</p>
            <p>Address : {`${contract?.address?.substring(0, 6)}....${contract?.address?.substring(contract?.address?.length - 4)}`}</p>
            <div className="flex justify-center mb-1">
                <a target={"_blank"} href={`https://etherscan.io/token/${contract.address}`} className="py-2 px-4 bg-blue-500 w-100 mt-3 mb-4 text-center rounded text-white cursor-pointer">View on etherscan</a>
            </div>
        </div>
    </div>
  )
}

export default NFTCARDS