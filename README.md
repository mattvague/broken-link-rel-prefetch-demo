# Demo of `Vary: Accept` breaking `<link rel="prefetch">`

This app demonstrates that when a server respons with a [`Vary: Accept`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary) header, usage of `<link rel="prefetch" href="my-other-page.html">` breaks. This is because (at least in Chrome), a different `Accept` header is used when navigating to a page and prefetching a page e.g.

When navigating (in Chrome):
```
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
```

When prefetching (in Chrome):
```
Accept: application/signed-exchange;v=b3;q=0.7,*/*;q=0.8
```

Since the two requests have different `Accept` headers, there is a cache miss when trying to navigate to the prefetched page.

## Running the demo

1. Clone the repo
1. Run `yarn install`
1. Run `yarn serve`
1. Visit [localhost:3001](http://localhost:3001/index.html) to demo `<link rel="prefetch">` working as expected
1. Visit [localhost:3002](http://localhost:3002/index.html) to demo `<link rel="prefetch">` being broken due to `Vary: Accept` header

### Checking whether `<link rel="prefetch">` is working/broken

Confirming that `<link rel="prefetch">` is working or broken can be done by opening Chrome DevTools, loading a page, waiting for the prefetch request then navigating. There is an artificial 2 second delay for all requests, so if the navigation happens instantly and Chrome DevTools > Network should say `(prefetch cache)` in the Size column (i.e. instead of 278 B)

## Resources / Related
- https://github.com/whatwg/html/pull/8111#issuecomment-1231981093
- https://www.smashingmagazine.com/2017/11/understanding-vary-header/
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Vary
- https://www.fastly.com/blog/understanding-vary-header-browser
