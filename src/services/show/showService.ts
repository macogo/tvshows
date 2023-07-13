import { PageData } from "../../models/Common";
import { Show, SearchShowResult } from "../../models/ShowModel";
import { api } from "../api";

//search TV shows by name
async function searchByName(searchText: string): Promise<Show[]> {
  if (searchByName.length < 1) return [];
  try {
    const { data } = await api.get<SearchShowResult[]>(
      `search/shows/?q=${searchText}`
    );
    const showList = data.map((value) => value.show);
    return showList;
  } catch (error) {
    console.log(error);
    return [];
  }
}

//get TV show list
async function getShowlist(page: number): Promise<PageData<Show>> {
  try {
    const { data } = await api.get<Show[]>(`shows?page=${page}`);
    return {
      data,
      nextPage: page + 1,
    };
  } catch (error) {
    return {
      data: [],
    };
  }
}

//get TV show detail
async function getShow(id: string) {
  try {
    const { data } = await api.get<Show>(`shows/${id}?embed=cast`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const showService = {
  searchByName,
  getShowlist,
  getShow,
};
