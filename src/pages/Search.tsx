import { redirect, useFetcher } from "react-router-dom";

export const Search = () => {
  const fetcher = useFetcher();
  return (
    <div>
      <div>
        <img src="" alt="" />
      </div>
      <div className="container flex justify-center">
        <h1>Bazar Online</h1>
        <fetcher.Form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const search = formData.get("search") as string;
            redirect(`/search?q=${search}`);
          }}
        >
          <input type="text" name="search" placeholder="Buscar" />
          <button type="submit">Buscar</button>
        </fetcher.Form>
      </div>
    </div>
  );
};
