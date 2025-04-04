"use client"

import AlumnusListComponent from "components/modules/alumnus-list"
import { DetailModal } from "components/modules/detail-modal"
import dynamic from "next/dynamic"
import { FC, useEffect, useState } from "react"
const Map = dynamic(() => import("components/modules/map").then((c) => c.Map), {
  ssr: false,
})

const IndexPage: FC = () => {
  const [isLandscape, setIsLandscape] = useState<boolean>(true)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-aspect-ratio: 1/1)")
    setIsLandscape(mediaQuery.matches)
    const handleChange = () => setIsLandscape(mediaQuery.matches)
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <>
      <section
        style={{
          display: "flex",
          flexDirection: isLandscape ? "row" : "column",
          flexWrap: "wrap",
          height: isLandscape && "100dvh",
          width: !isLandscape && "100dvw",
        }}
      >
        <Map
          style={{
            height: isLandscape ? "100dvh" : "50dvh",
            width: isLandscape ? "70dvw" : "100dvw",
          }}
        />
        <AlumnusListComponent
          style={{
            width: isLandscape ? "30dvw" : "100%",
          }}
        />
      </section>
      <DetailModal />
    </>
  )
}

export default IndexPage
