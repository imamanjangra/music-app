import { useState } from "react";
import { Play } from "lucide-react";
import { Sidebar } from "../components/sidebar";
import Topsong_api from "../components/Hooks/Topsong_api";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
// import AlbumSongs from "../components/Hooks/AlbumSongs";

export default function Home() {
  // const AlbumSongsData = AlbumSongs()
  // console.log(AlbumSongsData);
  const AlbumData = Topsong_api();
  // console.log(AlbumData);
  const shortData = AlbumData?.data?.results || [];
  const navigate = useNavigate();

  if (!shortData.length) {
    return (
      <div className="p-8 ml-64">
        <Sidebar />
        <p>Loading Top Songs...</p>
      </div>
    );
  }

  return (
    <div className="p-8 pb-32 ml-64">
      <Sidebar />

      <div className="mb-8">
        <h1 className="mb-2">Good evening</h1>
        <p className="text-muted-foreground">Ready to discover new music?</p>
      </div>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2>Top Songs</h2>
        </div>

        <Carousel className="w-full px-14" opts={{ align: "start" }}>
          <CarouselContent className="-ml-4">
            {shortData.map((song, i) => (
              <CarouselItem
                key={i}
                className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="group bg-card rounded-xl p-4 hover:bg-muted/50 transition cursor-pointer">
                  <div
                    onClick={() => navigate(`/playlist/${song.id}`)}
                    className="relative aspect-square rounded-xl overflow-hidden mb-4"
                  >
                    <img
                      src={song.image?.[2].url}
                      alt={song.name}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                      <div className="w-12 h-12 rounded-full bg-[#00ff88] flex items-center justify-center">
                        <Play className="text-black fill-black ml-1" />
                      </div>
                    </div>
                  </div>

                  <h4 className="truncate mb-1">{song.name}</h4>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </section>
    </div>
  );
}
