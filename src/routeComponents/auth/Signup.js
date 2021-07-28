import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../apis/api";
import TextInput from "../../components/TextInput";

function Signup(props) {
  const [state, setState] = useState({
    name: "",
    password: "",
    email: "",
    // profilePictureUrl: "",
    country: "",
    city: "",
  });
  const [error, setError] = useState(null);

  function handleChange(event) {
    if (event.target.files) {
      setState({
        ...state,
        [event.currentTarget.name]: event.currentTarget.files[0],
      });
    }

    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  // async function handleFileUpload(file) {
  //   const uploadData = new FormData();

  //   uploadData.append("profilePictureUrl", file);

  //   const response = await api.post("/upload", uploadData);

  //   return response.data.url;
  // }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // const profilePicture = await handleFileUpload(state.profilePictureUrl);

      const response = await api.post("/auth/signup", {
        state,
        // profilePicture,
      });
      setState({
        name: "",
        password: "",
        email: "",
        // profilePictureUrl: "",
        country: "",
        city: "",
      });
      setError(null);
      props.history.push("/auth/login");
    } catch (err) {
      console.error(err.response);
      setError(err.response.data.error);
    }
  }
  console.log(state);

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <h1>Cadastro</h1>

        <TextInput
          type="text"
          label="Nome"
          name="name"
          value={state.name}
          error={error}
          onChange={handleChange}
          required
        />

        <TextInput
          type="email"
          label="E-mail"
          name="email"
          value={state.email}
          error={error}
          onChange={handleChange}
          required
        />

        <TextInput
          type="password"
          label="Senha"
          name="password"
          value={state.password}
          error={error}
          onChange={handleChange}
          required
        />

        <TextInput
          type="country"
          label="País"
          name="country"
          value={state.country}
          error={error}
          onChange={handleChange}
          required
        />

        <TextInput
          type="city"
          label="Cidade"
          name="city"
          value={state.city}
          error={error}
          onChange={handleChange}
          required
        />
        {/* <TextInput
          type="file"
          label="Foto"
          name="profilePictureUrl"
          value={state.profilePictureUrl}
          error={error}
          onChange={handleChange}
        /> */}
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <div>
          <button className="btn btn-primary mt-3" type="submit">
            Cadastrar
          </button>

          <Link to="/auth/login">
            Já tem uma conta? Clique aqui para entrar.
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
