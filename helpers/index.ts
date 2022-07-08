export const priorityTraduction = (priority: 'HIGH' | 'MEDIUM' | 'LOW' | ''): string => {
  if(priority === 'HIGH') {
    return 'Alta';
  } else if (priority === 'MEDIUM') {
    return 'Media';
  } else if (priority === 'LOW'){
    return 'Baja';
  }
  return priority;
}

export const formatDate = (date: string): string => {
  const newDate = new Date(date).toISOString().split('.')[0].slice(0,-3)
  return newDate
}