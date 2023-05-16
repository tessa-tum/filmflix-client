import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      Title: "Everything Everywhere All At Once",
      Description:
        "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
      Director: {
        Name: "Daniel Kwan",
        Bio: 'Daniel Kwan with Daniel Scheinert, collectively known as Daniels, are a duo of film directors and writers. They began their career as directors of music videos, including the popular DJ Snake promotional for the single "Turn Down for What" (2013). They have since ventured into film, having written and directed the surreal comedy-drama Swiss Army Man (2016) and the science-fiction action comedy Everything Everywhere All at Once (2022), the latter became A24s highest-grossing film of all time.',
        Birth: "1988-02-10",
      },
      Genre: {
        Name: "Action",
        Description:
          "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero. ",
      },
      ImageURL:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/38LNk3VrCZVE3zQTgqCLwIhiU9u.jpg",
    },
    {
      id: 2,
      Title: "Princess Mononoke",
      Description:
        "On a journey to find the cure for a Tatarigamis curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime.",
      Director: {
        Name: "Hayao Miyazaki",
        Bio: "Hayao Miyazaki is 1 of Japans greatest animation directors. The entertaining plots, compelling characters and breathtaking animation in his films have earned him international renown from critics as well as public recognition within Japan.",
        Birth: "1941-01-05",
      },
      Genre: {
        Name: "Animation",
        Description:
          "Animated films are ones in which individual drawings, paintings, or illustrations are photographed frame by frame (stop-frame cinematography).",
      },
      ImageURL:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vFRKcH8zDqEx4nUnm0cs5lh5wwj.jpg",
    },
    {
      id: 3,
      Title: "The Woman King",
      Description:
        "A historical epic inspired by true events that took place in The Kingdom of Dahomey, one of the most powerful states of Africa in the 18th and 19th centuries.",
      Director: {
        Name: "Gina Prince-Bythewood",
        Bio: "Gina Prince-Bythewood (Writer/Producer/Director) studied at UCLA Film School, where she received the Gene Reynolds Scholarship for Directing and the Ray Stark Memorial Scholarship for Outstanding Undergraduate. She was a member of UCLAs track and field team, qualifying for the Pac-10 Championships in the triple jump.",
        Birth: "1969-06-10",
      },
      Genre: {
        Name: "Drama",
        Description:
          "Drama films are a genre that relies on the emotional and relational development of realistic characters. They often feature intense character development, and sometimes rely on tragedy to evoke an emotional response from the audience.",
      },
      ImageURL:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gJzGi5lB2GHxQxwnhwNi9i6W9h8.jpg",
    },
    {
      id: 4,
      Title: "Parasite",
      Description:
        "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      Director: {
        Name: "Bong Joon Ho",
        Bio: "Bong Joon-ho is a South Korean filmmaker and the recipient of three Academy Awards.",
        Birth: "1969-09-14",
      },
      Genre: {
        Name: "Drama",
        Description:
          "Drama films are a genre that relies on the emotional and relational development of realistic characters. They often feature intense character development, and sometimes rely on tragedy to evoke an emotional response from the audience.",
      },
      ImageURL:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hoqe3leVhHBgboB6G1bv1kB8K4p.jpg",
    },
    {
      id: 5,
      Title: "The Old Guard",
      Description:
        "A covert team of immortal mercenaries is suddenly exposed and must now fight to keep their identity a secret just as an unexpected new member is discovered.",
      Director: {
        Name: "Gina Prince-Bythewood",
        Bio: "Gina Maria Prince-Bythewood is an American film director and screenwriter. She began her career as a writer for multiple television shows in the 1990s and made her feature film directorial debut with Love & Basketball (2000), for which she received an Independent Spirit Award.",
        Birth: "1969-06-10",
      },
      Genre: {
        Name: "Action",
        Description: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. The genre tends to feature a mostly resourceful hero struggling against incredible odds, which include life-threatening situations, a dangerous villain, or a pursuit which usually concludes in victory for the hero.",
      },
      ImageURL:
        "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2AuZFt994oFQTznOgmZYY1SBado.jpg",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
