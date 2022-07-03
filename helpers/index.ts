export const priorityTraduction = (priority: 'HIGH' | 'MEDIUM' | 'LOW'): string => {
  if(priority === 'HIGH') {
    return 'Alta';
  } else if (priority === 'MEDIUM') {
    return 'Media';
  } else {
    return 'Baja';
  }
}