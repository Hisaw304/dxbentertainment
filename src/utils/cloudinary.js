const CLOUD_NAME = "dfo4k5eel";

const url = (id) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_500/${id}`;

const GROUPS = {
  groupA: [
    "2c7b1b45-8853-4894-a47c-e46a560f1507_kjjirx",
    "192c33c7-4599-4aa6-87f7-ab130291909b_tvtzaf",
    "b36de06c-2d4a-46d9-9f9a-bcfb18704ffe_bwy3aw",
    "cd388382-1183-483e-b932-f0f9ffc059c4_q7psnm",
    "dd4a4b18-6cb6-4542-9f98-3135fe068b4b_ulrpom",
    "138cb0fd-ea22-47cc-86fd-f798acb8d0d8_ufydzk",
    "7ac3d2f8-a44a-4730-8103-8009a8a2ef7b_qvualv",
    "ac58a3b8-0631-42cc-9f2e-050607d31c3f_lkvnwi",
    "f71ae7f4-9104-4bdd-878e-65f08b8c9f15_na2vyu",
    "3a7af245-3ff9-4461-8878-737b5b804957_b3gyq1",
  ],

  groupB: [
    "e4b90fe2-570f-42c1-aa72-6e885c749382_fgms35",
    "0e998b9e-f572-4940-afcb-896c3b7f2893_iexa2b",
    "2490d208-60e6-4b7a-864a-51ed6fdd5806_cgcwxt",
    "f7633b97-1320-4b44-a5cc-d3816f5e7e4f_pfhwmv",
    "bb22a6f0-7e30-4c55-bf6a-a8f850df30a5_wbtvff",
    "d7a005a1-c3eb-48d5-aee5-479f2e87626f_ymiztf",
    "195a6174-b152-4bb1-b8d7-1d7d57102854_mplei5",
    "12898275-600d-4101-a2e4-bcd8f6c9a417_a67slm",
    "43dc504c-cf96-4d0d-8184-591a4a497a89_avizxw",
    "8a210676-1c60-42eb-b89d-1a5e9dbaf877_glztuv",
  ],

  groupC: [
    "f63c89ed-8d9e-420b-99ab-9a4d81f2f206_awg1rs",
    "d9d25ce8-88bd-47c0-ae77-737b98ee6fa9_ehvdap",
    "336b7926-bff7-4081-acb0-96067bfcd0f5_xndzsf",
    "fd2ca3f8-e0e1-4c0c-85e2-e67739129534_blxjzk",
    "b429ff37-c607-4cc1-9fc4-96831917eb79_iriiqa",
    "f8321c40-f7a4-45fb-943d-608792adfbcc_pkawuu",
    "d59da938-0e44-4565-9f22-a555327c3178_akdrcm",
    "b363e842-4718-44d0-87d1-9c3976d03272_mhvubg",
    "9c4aaf47-475b-4725-9a9d-a89f6bea869e_llv7hv",
    "2541ecc2-4343-4da8-ab0e-dbdbe7d40342_mtcp3w",
  ],
};

export const getCloudinaryGroup = (group) => GROUPS[group].map((id) => url(id));
