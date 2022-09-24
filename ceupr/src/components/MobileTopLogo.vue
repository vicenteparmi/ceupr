<script>
export default {
  name: "MobileTopLogo",
};
</script>

<template>
  <div>
    <svg
      fill="var(--secondary)"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 345.54 365.9"
      id="main__logo"
    >
      <g id="Camada_2" data-name="Camada 2">
        <g id="Camada_1-2" data-name="Camada 1">
          <path
            class="cls-1"
            d="M.85,218.59,50.5,268.24V247L22.06,218.59,50.5,190.15l6.74-6.74L172.86,67.79l150.81,150.8L234.27,308V217a60.68,60.68,0,0,0-121.36,0v92.49L90.5,287v21.21l22.41,22.41,7.5,7.5,10.33,10.33a59.64,59.64,0,0,0,84.25,0l11.78-11.78,7.5-7.5L344.88,218.59l-172-172ZM219.27,323l-14.89,14.89a44.58,44.58,0,0,1-63,0l-13.44-13.44V217a45.68,45.68,0,0,1,91.36,0Z"
          />
          <polygon
            class="cls-1"
            points="252.27 17.18 252.27 0 94.91 0 94.91 17.18 0 17.18 0 201.76 15 186.76 15 32.18 94.91 32.18 94.91 106.84 109.91 91.84 109.91 17.18 109.91 15 237.27 15 237.27 17.18 237.27 93.3 252.27 108.3 252.27 32.18 330.54 32.18 330.54 186.57 345.54 201.57 345.54 17.18 252.27 17.18"
          />
          <polygon
            class="cls-1"
            points="63 360.48 70.5 360.48 78 360.48 78 180.33 63 195.33 63 360.48"
          />
        </g>
      </g>
    </svg>
    <span>CEU</span>
  </div>
</template>

<style scoped>
#main__logo {
  height: 48px;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  margin-right: 12px;
}

div {
  display: none;
  align-items: center;
  justify-content: left;
  flex-direction: row;
  cursor: pointer;
  margin-bottom: 24px;
  color: var(--secondary);
  font-size: 24px;
  font-weight: 500;
}

@media only screen and (max-width: 600px) {
  div {
    display: flex;
  }
}
</style>
