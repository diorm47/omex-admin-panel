import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

function DatasPage() {
  const { register, handleSubmit, setValue, reset } = useForm();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://omex-backend-production.up.railway.app/datas"
      );
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
        `https://omex-backend-production.up.railway.app/datas/${data._id}`,
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

    try {
      const response = await axios.post(
        "http://localhost:3001/file",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const fileUrl = response.data.url;
      setValue(field, fileUrl);
    } catch (error) {
      console.error("Ошибка при загрузке файла:", error);
    }
  };

  const tokens = {
    team: "Team",
    staking: "Staking&Revards",
    liquidity: "Liquidity",
    partnerships: "Partnerships & Cooperation",
    marketing: "Marketing & Communit",
    airdrop: "Airdrop",
    presale: "Pre-Sale",
    ecosystem: "Ecosystem Fund",
  };

  return (
    <div className="datas_page">
      {data ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input_item">
            <label>
              <p>Таймер</p>
            </label>
            <input type="text" {...register("timer")} required />
          </div>

          <div className="input_item">
            <label>
              <p>Tokenomics (Загрузка файла)</p>
            </label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "tokenomics_link")}
            />
            {data.tokenomics_link && (
              <p>
                <a
                  href={`https://omex-backend-production.up.railway.app${data.tokenomics_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Скачать Tokenomics
                </a>
              </p>
            )}
          </div>

          <div className="input_item">
            <label>
              <p>Whitepaper (Загрузка файла)</p>
            </label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "whitepaper_link")}
            />
            {data.whitepaper_link && (
              <p>
                <a
                  href={`https://omex-backend-production.up.railway.app${data.whitepaper_link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Скачать Whitepaper
                </a>
              </p>
            )}
          </div>

          <div className="input_item">
            <p>Токеномика</p>
            {Object.keys(data.token).map((key) => (
              <div key={key} className="input_item">
                <label>
                  <p>{tokens[key]} (%)</p>
                </label>
                <input type="number" {...register(`token.${key}`)} required />
              </div>
            ))}
          </div>

          <button type="submit" className="submit_btn">
            Обновить
          </button>
        </form>
      ) : (
        <p className="loading">Загрузка данных...</p>
      )}
    </div>
  );
}

export default DatasPage;
