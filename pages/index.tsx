import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import NFTCARDS from '../components/NFTCARDS'

const Home: NextPage = () => {
  const [wallet, setwallet] = useState('');
  const [collection, setCollection] = useState('');
  const [fetchForCollection, setFetchForCollection] = useState(false);
  const [nfts, setNfts] = useState([]);
  const [pageCount, setPageCount] = useState('');

  const fetchNfts = async () => {
    let nfts;
    const api_key = 'rknzIJr16GzJWNtZSkAov2vvYwkiImYL';
    const baseurl = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTs/`;
    var requestOptions = {
      method: 'GET'
    };

    if(!collection.length){
      const fetchURL = `${baseurl}?owner=${wallet}`;
      nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
      setNfts(nfts.ownedNfts);
      setPageCount(nfts.totalcount);
    }else {
      console.log("fetching nfts for collection owned by address")
      const fetchURL = `${baseurl}?owner=${wallet}&contractAddresses%5B%5D=${collection}`;
      nfts= await fetch(fetchURL, requestOptions).then(data => data.json())
      setNfts(nfts.ownedNfts);
      setPageCount(nfts.totalcount);
    }
  }

  console.log(nfts)
  const fetchNftsForCollection = async () => {
    if(collection.length){
      const api_key = 'rknzIJr16GzJWNtZSkAov2vvYwkiImYL';
      const baseurl = `https://eth-mainnet.g.alchemy.com/v2/${api_key}/getNFTsForCollection/`;
      var requestOptions = {
        method: 'GET'
      };
      const fetchURL = `${baseurl}?contractAddress=${collection}&withMetadata=${"true"}`;
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
      if(nfts){
        setNfts(nfts.nfts)
      }
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>NFT Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-full flex-col items-center justify-center py-8 gap-y-3 ">
        <div className="flex flex-col w-full justify-center items-center gap-y-2">
          <h1 className='text-2xl font-bold'>NFT Gallery</h1>
          <input type="text" className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" placeholder='Enter wallet addresss' disabled={fetchForCollection} onChange={(e) => setwallet(e.target.value)}/>
          <input type="text" className="w-2/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50" placeholder='Enter collection addresss' onChange={(e) => setCollection(e.target.value)}/>
          <label htmlFor="">
            <input type="checkbox" className='mr-2' onChange={(e) => setFetchForCollection(e.target.checked)}/>
            Fetch for collection
          </label>
          <button
           className='w-1/5 bg-blue-400 text-white py-3 rounded mt-3 disabled:bg-slate-500'
           onClick={() => {
            if(fetchForCollection){
              fetchNftsForCollection()
            }else fetchNfts()
          }}>Fetch NFTS</button>

          <div className="flex flex-wrap justify-center p-3 w-5/6 mt-4 gap-x-3 gap-y-12">
            {
              nfts && nfts.map(({title, description, contract, media, tokenUri}, index) => {
                return(
                  <NFTCARDS title={title} description={description} contract={contract} media={media} key={index}/>
                )
              })
            }  
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
