import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import { FC } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const WatchPage: FC = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data: movie } = useMovie(movieId as string);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          onClick={() => {
            router.push("/");
          }}
          className="text-white cursor-pointer"
          size={40}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {movie?.title}
        </p>
      </nav>
      <video
        className="h-full w-full"
        autoPlay
        controls
        src={movie?.videoUrl}
      ></video>
    </div>
  );
};

export default WatchPage;
