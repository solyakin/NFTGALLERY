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
    title : string,
    id : { tokenId : string}
    metadata : { tokenID : string}
}

const NFTCARDS : FC<NftCardProps> = ({ title, description, media, contract, id, metadata }) => {
    const nftImage = media[0].gateway;
  return (
    <div className='w-full md:w-1/4 flex flex-col'>
        <div className="rounded-md">
            <Image loader={() => nftImage} unoptimized src={nftImage} width={200} height={200} alt="ntf-image" className='w-full h-64 object-cover'/>
        </div>
        <div className="flex flex-col bg-slate-100 rounded-b-md py-3 px-3">
            <h1 className='font-bold text-2xl mb-0 text-grey-800'>#{id.tokenId.substring(id.tokenId.length - 4)}</h1>
            <h2 className='font-bold text-xl my-2 text-grey-800'>{title}</h2>
            <p className='text-grey-800 mb-3'>{description ? `${description?.substring(0, 160)} ...` : ""}</p>
            <p>Address : {`${contract?.address?.substring(0, 6)}....${contract?.address?.substring(contract?.address?.length - 4)}`}</p>
            <div className="flex flex-col justify-center mb-1">
                <a target={"_blank"} href={`https://etherscan.io/token/${contract.address}`} className="py-2 px-4 bg-blue-500 w-100 mt-5 mb-1 text-center rounded text-white cursor-pointer">View on etherscan</a>
            </div>
            {
                metadata.tokenID && <div className="flex flex-col justify-center mb-1">
                    <a target={"_blank"} href={`https://opensea.io/assets/ethereum/${contract.address}/${metadata.tokenID}`} className="py-2 px-4 bg-blue-500 w-100 mb-4 text-center rounded text-white cursor-pointer">View on opensea</a>
                </div>
            }
            
        </div>
    </div>
  )
}

export default NFTCARDS