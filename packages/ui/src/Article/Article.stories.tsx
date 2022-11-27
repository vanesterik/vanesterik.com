import { useLadleContext } from '@ladle/react'
import { Article } from './Article'

const content = `
# Lorem ipsum dolor sit amet, consectetur adipiscing elit

![https://dummyimage.com](https://dummyimage.com/800x450/F5F5F4/000000)

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam vestibulum morbi blandit cursus. Feugiat sed lectus vestibulum mattis. Enim blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Etiam erat velit scelerisque in dictum non.

Interdum velit euismod in pellentesque. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Velit laoreet id donec ultrices tincidunt. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Nec feugiat in fermentum posuere urna. Adipiscing tristique risus nec feugiat in fermentum posuere urna. A scelerisque purus semper eget duis at tellus at urna. Sit amet nulla facilisi morbi tempus iaculis urna id volutpat. Ut pharetra sit amet aliquam. In ante metus dictum at tempor commodo ullamcorper a. Lectus magna fringilla urna porttitor rhoncus dolor purus non enim. Nulla porttitor massa id neque aliquam vestibulum. Facilisi cras fermentum odio eu feugiat pretium nibh.

## Sed euismod nisi porta lorem mollis aliquam ut porttitor

Orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Leo integer malesuada nunc vel risus commodo viverra maecenas. Pharetra massa massa ultricies mi quis hendrerit. Porttitor lacus luctus accumsan tortor posuere ac ut consequat. Egestas sed sed risus pretium quam vulputate. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Eros donec ac odio tempor orci. Felis donec et odio pellentesque diam volutpat commodo sed egestas. Sit amet volutpat consequat mauris nunc congue nisi. Est sit amet facilisis magna etiam tempor orci eu. Aliquam vestibulum morbi blandit cursus risus at ultrices. Vulputate ut pharetra sit amet aliquam id diam. Integer quis auctor elit sed vulputate mi. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque. Ultrices tincidunt arcu non sodales neque sodales ut etiam. Tincidunt vitae semper quis lectus. Tincidunt nunc pulvinar sapien et ligula. Nisl purus in mollis nunc sed id semper risus. Nulla facilisi etiam dignissim diam quis enim lobortis scelerisque fermentum.

## Justo donec enim diam vulputate

Faucibus turpis in eu mi bibendum neque egestas. Convallis posuere morbi leo urna molestie at elementum. Lacus sed turpis tincidunt id aliquet risus. Gravida rutrum quisque non tellus. Sed viverra tellus in hac habitasse platea dictumst. Elit sed vulputate mi sit amet. Facilisis gravida neque convallis a cras semper auctor neque. Netus et malesuada fames ac turpis. Convallis convallis tellus id interdum velit laoreet id donec. Sit amet cursus sit amet dictum sit amet justo. Aliquam vestibulum morbi blandit cursus risus. Lectus mauris ultrices eros in cursus turpis massa. Tellus in metus vulputate eu scelerisque. Netus et malesuada fames ac turpis egestas integer. Tortor condimentum lacinia quis vel eros donec ac odio.

Gravida dictum fusce ut placerat. Aliquam ut porttitor leo a diam sollicitudin tempor id. Metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Blandit cursus risus at ultrices mi tempus imperdiet. Fermentum odio eu feugiat pretium nibh ipsum. Tellus integer feugiat scelerisque varius morbi enim. Etiam tempor orci eu lobortis elementum nibh. Purus non enim praesent elementum facilisis leo vel. Felis bibendum ut tristique et. Ornare quam viverra orci sagittis. Ut tellus elementum sagittis vitae. Lorem ipsum dolor sit amet consectetur adipiscing elit pellentesque. Massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Ornare arcu odio ut sem nulla. Turpis egestas maecenas pharetra convallis posuere morbi. Et ultrices neque ornare aenean euismod elementum nisi quis eleifend. Elit scelerisque mauris pellentesque pulvinar.

Non curabitur gravida arcu ac tortor dignissim. Proin libero nunc consequat interdum varius. Odio tempor orci dapibus ultrices in iaculis. Duis ultricies lacus sed turpis tincidunt id aliquet risus feugiat. Nisi lacus sed viverra tellus in hac. Non enim praesent elementum facilisis leo vel fringilla est ullamcorper. In dictum non consectetur a erat nam. Mauris commodo quis imperdiet massa tincidunt nunc pulvinar. Malesuada proin libero nunc consequat interdum varius. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Elementum integer enim neque volutpat ac tincidunt vitae semper quis.
`

export const Base = () => {
  const { globalState } = useLadleContext()

  return (
    <div className={globalState.theme}>
      <Article content={content} meta="scope(type?): description" />
    </div>
  )
}
