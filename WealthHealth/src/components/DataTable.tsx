import { ChangeEvent, useEffect, useState } from "react";

export default ({
  data,
  columns,
}: {
  data: Array<{ [key: string]: string }>;
  columns: Array<{ title: string; data: string }>;
}) => {
  //? Creation des etats et ajout des types
  const [filteredData, setFilteredData] =
    useState<Array<{ [key: string]: string }>>(data);
  const [showNb, setShowNb] = useState<number>(10);
  const [sorting, setSorting] = useState<{ column: string; type: string }>({
    column: "",
    type: "asc",
  });
  const [search, setSearch] = useState<string>("");
  const [pageNb, setPageNb] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(
    Math.ceil(filteredData.length / showNb)
  );

  /**
hook pour effectuer le tri après chaque modification des données
*/
  useEffect(() => {
    handleSorting();
  }, []);

  /**

Utilise l'effet pour mettre à jour le nombre maximum de pages pouvant être affichées
@param {Object[]} filteredData - tableau des données filtrées.
@param {*} showNb - Nombre d'éléments à afficher par page.
*/

  useEffect(() => {
    setMaxPage(Math.ceil(filteredData.length / showNb));
  }, [filteredData, showNb]);

  /**

Cette fonction met à jour le nombre de lignes affichées par rapport à la valeur sélectionnée par l'utilisateur.
@param {ChangeEvent} target contient les données du composant HTML sélectionné, qui prennent la forme d'un objet.
@returns Ne retourne rien, seulement mis à jour le state interne de l'application en appelant setShowNb avec la valeur sélectionnée.
*/

  /**
   * Handler pour le changement de sélection d'un "select" HTML
   * @param {ChangeEvent<HTMLSelectElement>} événement du changement de sélection
   */
  const handleSelectChange = ({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) => {
    setShowNb(+value);
  };

  /**
   * handleSearch() est une fonction qui applique un filtre sur les données à l'aide d'un champs de recherche.
   *
   * @param {ChangeEvent<HTMLInputElement>} La variable ChangeEvent contient des informations sur le changement d'un élément HTML.
   * @returns {void}
   */
  const handleSearch = ({
    target: { value: searchValue },
  }: ChangeEvent<HTMLInputElement>) => {
    setSearch(searchValue);
    searchValue
      ? setFilteredData((prev) => [
          ...prev.filter((data) =>
            Object.values(data).find((value) => value.includes(searchValue))
          ),
        ])
      : setFilteredData([...data]);
  };

  /**
   * @description La fonction gère le tri des données en fonction de la colonne spécifiée.
   * Si aucune colonne n'est spécifiée, alors prend le premier élément des colonnes et associe un type d'ordre ascendant.
   * Si une colonne est spécifiée, elle est triée dans l'ordre ascendant/descendant précédemment défini pour cette colonne.
   *
   * @param {string} [column] le nom de la colonne à trier.
   */
  const handleSorting = (column?: string) => {
    const prevSorting = { ...sorting };

    if (!column) {
      setSorting((prev) =>
        prev.column ? { ...prev } : { column: columns[0].data, type: "asc" }
      );
      if (!filteredData.length) {
        return;
      }
      if (!prevSorting.column) {
        if (isNaN(+filteredData[0][columns[0].data])) {
          setFilteredData((prev) => [
            ...prev.sort((a, b) =>
              a[columns[0].data].localeCompare(b[columns[0].data])
            ),
          ]);
        } else {
          setFilteredData((prev) => [
            ...prev.sort((a, b) => +a[columns[0].data] - +b[columns[0].data]),
          ]);
        }
      }
      return;
    }

    setSorting((prev) =>
      prev.column === column
        ? prev.type === "asc"
          ? { ...prev, type: "desc" }
          : { ...prev, type: "asc" }
        : { column, type: "asc" }
    );

    if (prevSorting.column === column) {
      if (prevSorting.type === "asc") {
        if (isNaN(+filteredData[0][column])) {
          setFilteredData((prev) => [
            ...prev.sort((a, b) => b[column].localeCompare(a[column])),
          ]);
        } else {
          setFilteredData((prev) => [
            ...prev.sort((a, b) => +b[column] - +a[column]),
          ]);
        }
      } else {
        if (isNaN(+filteredData[0][column])) {
          setFilteredData((prev) => [
            ...prev.sort((a, b) => a[column].localeCompare(b[column])),
          ]);
        } else {
          setFilteredData((prev) => [
            ...prev.sort((a, b) => +a[column] - +b[column]),
          ]);
        }
      }
    } else {
      if (isNaN(+filteredData[0][column])) {
        setFilteredData((prev) => [
          ...prev.sort((a, b) => a[column].localeCompare(b[column])),
        ]);
      } else {
        setFilteredData((prev) => [
          ...prev.sort((a, b) => +a[column] - +b[column]),
        ]);
      }
    }
  };

  /**

Gère le changement de page
@param {string} direction - Direction (next ou prev)
*/
  const handlePageChange = (direction: string) => {
    if (direction === "prev") {
      setPageNb((prev) => {
        return prev === 1 ? 1 : prev - 1;
      });
    } else {
      setPageNb((prev) => {
        return prev === maxPage ? maxPage : prev + 1;
      });
    }
  };

  /**
Fonction pour gérer le changement de numéro de page
@param {number} num - Numéro de page
*/
  const handlePageNumChange = (num: number) => {
    setPageNb(num);
  };

  return (
    <div className="table_container">
      <div className="flex justify-between mb-5">
        <div className="table_length">
          <label>
            Show{" "}
            <select
              className="mx-2 border rounded p-1"
              onChange={handleSelectChange}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>{" "}
            entries
          </label>
        </div>
        <div className="table_filter">
          <label>
            Search:
            <input
              type="search"
              className="mx-2 border rounded p-1"
              value={search}
              onChange={handleSearch}
            />
          </label>
        </div>
      </div>
      <table className="data_table border w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={
                  "p-3 text-left cursor-pointer " +
                  (sorting.column === column.data
                    ? sorting.type === "asc"
                      ? "sorting_asc"
                      : "sorting_desc"
                    : "sorting")
                }
                onClick={() => handleSorting(column.data)}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length ? (
            filteredData
              .slice((pageNb - 1) * showNb, (pageNb - 1) * showNb + showNb)
              .map((data, index) => (
                <tr key={index} className={index % 2 ? "bg-gray-50" : ""}>
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      className={
                        "p-3 " +
                        (sorting.column === column.data ? "sorting" : "")
                      }
                    >
                      {data[column.data]}
                    </td>
                  ))}
                </tr>
              ))
          ) : (
            <tr className="bg-gray-50">
              <td className="table_empty p-3" colSpan={columns.length}>
                No data available in table
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="table_info py-2 text-sm">
        Showing {filteredData.length ? (pageNb - 1) * showNb + 1 : 0} to{" "}
        {filteredData.slice(0, (pageNb - 1) * showNb + showNb).length} of{" "}
        {data.length} entries
      </div>
      <div className="table_paginate">
        <a
          className={
            "px-3 py-1 rounded border mr-2 " +
            (pageNb === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white cursor-pointer")
          }
          onClick={() => handlePageChange("prev")}
        >
          Previous
        </a>
        <span>
          {filteredData.length
            ? new Array(maxPage).fill(0).map((data, page) => (
                <a
                  key={page + 1}
                  className={
                    "px-3 py-1 rounded border mr-2 " +
                    (pageNb === page + 1
                      ? "bg-blue-600 text-white cursor-not-allowed"
                      : "bg-white cursor-pointer")
                  }
                  onClick={() => handlePageNumChange(page + 1)}
                >
                  {page + 1}
                </a>
              ))
            : null}
        </span>
        <a
          className={
            "px-3 py-1 rounded border mr-2 " +
            (pageNb >= maxPage ? " disabled" : "")
          }
          onClick={() => handlePageChange("next")}
        >
          Next
        </a>
      </div>
    </div>
  );
};
