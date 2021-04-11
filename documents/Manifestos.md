# MANIFESTOS

Chamada que retorna os detalhes de todas as missões feitas pelo rover em marte. Desde sua data de lançamento, data de pouso e o total de imagens tiradas até agora. Como também todas as datas que foram tiradas fotos

---

<br />

## PHOTO_MANIFESTS

> Detalhes gerais sobre a atuação do rover em marte

---

| Chave            | Descrição                                                                 |
| ---------------- | ------------------------------------------------------------------------- |
| **name**         | Nomenclatura do rover                                                     |
| **landing_date** | Data do pouso em marte                                                    |
| **launch_date**  | Data do lançamento aqui na terra                                          |
| **status**       | Estado de atuação do rover                                                |
| **max_date**     | Data máxima até onde se tem registro de imagens                           |
| **total_photos** | Total de imagens capturadas desde sua chegada                             |
| **photos**       | Lista de manifestos por dia ou sol (medida de tempo utilizada para marte) |

---

<br />

## MANIFEST

> Objeto que contém os detalhes das capturas de imagens por tempo

---

| Chave            | Descrição                                                                                     |
| ---------------- | --------------------------------------------------------------------------------------------- |
| **sol**          | Unidade de medida de tempo em marte - um dia em marte é alguns minutos a mais do que na terra |
| **earth_date**   | Data na terra em que foi capturada as imagens                                                 |
| **total_photos** | Total de fotos capturadas naquela data                                                        |
| **cameras**      | Lista de câmeras que foram utilizadas para capturar as imagens                                |
