import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "@/lib/axios";

interface Video {
  id: string;
  name: string;
  path: string;
  transcription: any;
  createdAt: string;
}

interface VideoSelectProps {
  onVideoSelected: (template: string) => void;
}

export function VideoSelect(props: VideoSelectProps) {
  const [videos, setVideos] = useState<Video[] | null>(null);

  useEffect(() => {
    api.get("/videos").then((response) => {
      setVideos(response.data);
    });
  }, []);

  function handleVideosSelected(id: string) {
    const selectedVideo = videos?.find((video) => video.id === id);

    if (!selectedVideo) {
      return;
    }

    props.onVideoSelected(selectedVideo.id);
  }

  return (
    <Select onValueChange={handleVideosSelected}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {videos?.map((video) => {
          return (
            <SelectItem key={video.id} value={video.id}>
              {video.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
