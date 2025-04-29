import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function DatasPage() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://api-omex.omexeth.io/datas");
      if (response.data.length > 0) {
        const fetchedData = response.data[0];
        setData(fetchedData);
        Object.keys(fetchedData).forEach((key) =>
          setValue(key, fetchedData[key])
        );
        Object.keys(fetchedData.token || {}).forEach((key) =>
          setValue(`token.${key}`, fetchedData.token[key])
        );
      }
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        throw new Error("Вы не авторизованы");
      }

      await axios.put(
        `https://api-omex.omexeth.io/datas/${data._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Данные обновлены!");
      fetchData();
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
      alert("Ошибка при обновлении данных: " + error.message);
    }
  };

  const handleFileUpload = async (event, field) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setLoading(true)
    try {
      const response = await axios.post(
        "https://api-omex.omexeth.io/file",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const fileUrl = response.data.url;
      setValue(field, fileUrl);
      setLoading(false)
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
      setLoading(false)
    }
  };

  const tokens = {
    community: "Community Rewards",
    ecosystem: "Ecosystem Fund",
    team: "Team",
    advisors: "Advisors",
    seed: "Seed & Private Investors",
    ido: "IDO",
    liquidity: "Liquidity",
  };

  return (
    <div className="datas_page">
      <div className="page_title">
        <h2>Data change</h2>
      </div>
      {data ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="datas_3_grid">
            <div className="input_item">
              <label>
                <p>Timer</p>
              </label>
              <input type="text" {...register("timer")} required />
            </div>

            <div className="input_item">
              <label>
                <p>Tokenomics (Uploading a file)</p>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, "tokenomics_link")}
              />
              {data.tokenomics_link && (
                <p>
                  <a
                    href={`https://api-omex.omexeth.io${data.tokenomics_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Tokenomics
                  </a>
                </p>
              )}
            </div>

            <div className="input_item">
              <label>
                <p>Whitepaper (Uploading a file)</p>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, "whitepaper_link")}
              />
              {data.whitepaper_link && (
                <p>
                  <a
                    href={`https://api-omex.omexeth.io${data.whitepaper_link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download Whitepaper
                  </a>
                </p>
              )}
            </div>
          </div>
          <div className="input_item ">
            <p>Whitepaper text</p>
            <textarea
              name=""
              id=""
              {...register("whitepaper_text")}
              required
            ></textarea>
          </div>

          <div className="input_item ">
            <p>Tokenomics</p>
            <div className="diagramm_inputs">
              {Object.keys(data.token).map((key) => (
                <div key={key} className="input_item">
                  <label>
                    <p>{tokens[key]} (%)</p>
                  </label>
                  <input type="number" {...register(`token.${key}`)} required />
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="submit_btn">
            Update
          </button>
        </form>
      ) : (
        <p className="loading">Loading data...</p>
      )}
      {loading ? <div className="loading"></div> : ""}
    </div>
  );
}

export default DatasPage;
