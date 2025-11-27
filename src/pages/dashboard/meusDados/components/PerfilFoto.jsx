import React from 'react';

const PerfilFoto = ({ imagem, handleImagemChange }) => {
  return (
    <figure className="flex flex-col items-center justify-center h-[15em] w-[10em] rounded-xl">
      <img
        className="rounded-xl"
        src={imagem || "https://placehold.co/300x300"}
        alt="Foto de perfil paciente"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
      <label className="text-[#643BA1] cursor-pointer mt-2 font-semibold hover:text-[#522e86] transition-colors">
        Alterar Foto
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImagemChange}
        />
      </label>
    </figure>
  );
};

export default PerfilFoto;
