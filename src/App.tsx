import React, {ChangeEvent, useState} from "react";
import {Media} from "./media";
import "./App.css";

const Medias = () => {
    const [medias, setMedias] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setMedias([]);
        const url = new URL("https://localhost:7042/api/Media/Medias");
        url.searchParams.set("name", searchQuery);
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setMedias(data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    };

    return (
        <div className="container">
            <h1 className="title">MediaChecker UI</h1>
            <div className="search-container">
                <form onSubmit={handleSubmit}>
                    <label className="search-label" htmlFor="searchQuery">Name: </label>
                    <input
                        type="text"
                        id="searchQuery"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <button className="search-button" type="submit">Search</button>
                </form>
            </div>
            {isLoading ? (
                <p>loading...</p>
            ) : (
                <div className="media-container">
                        <div className="count">Media(s) found: {medias.length}</div>
                        {medias.map((media) => (
                            <li className="list" key={media.id}>
                                <div className="media-info">
                                    <h2 className="media-name">{media.name}</h2>
                                </div>
                                <div className="media-size"> {media.size}GB</div>
                                <div className="media-format"> [{media.format}]</div>
                                <div className="media-format"> [{media.path}]</div>
                            </li>
                        ))}
                </div>
            )}
        </div>
    );
};

export default Medias;

