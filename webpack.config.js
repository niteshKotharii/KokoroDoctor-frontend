import { withExpo } from '@expo/webpack-config';

export default async function (env, argv) {
  const config = await withExpo(env, argv);
  return config;
};
