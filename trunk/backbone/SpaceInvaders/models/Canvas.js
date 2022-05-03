export const canvas = document.getElementById('canvas')
export const cv = canvas.getContext('2d')

// #TODO: Do we need innerHeight and innerWidth equal canvas height and width?
// Fixed canvas inorder to support most browser size
canvas.width = 1360
canvas.height = 768