import {useContext} from 'react';
import { VeterinarianContext } from '../context/VeterinarianProvider';
import { ContextProps } from '../context/VeterinarianProvider';

export default function useVeterinarian() {
  return useContext(VeterinarianContext) as ContextProps['defaultContext'];
}
