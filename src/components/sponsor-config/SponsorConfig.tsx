import Link from 'next/link'

export function SponsorConfig() {
  return (
    <div className="text-body-s text-text-subdued">
      <p>Want to sponsor gas on Ronin and improve UX?</p>
      <p>
        <Link
          className="underline hover:cursor-pointer"
          href="https://docs.skymavis.com/mavis/ronin-waypoint/guides/sponsor-gas"
          target="_blank"
        >
          Check out the docs
        </Link>
      </p>
    </div>
  )
}
