{
    'name': 'Redeem Digital Wallet Theme',
    'version': '19.0.1.0.0',
    'sequence': 1,
    'category': 'Theme/Business',
    'summary': 'Digital wallet and financial services landing page theme',
    'description': """
Redeem Digital Wallet Theme
===========================
A modern, responsive theme designed for digital wallet and financial services landing pages.
Features clean design, mobile-first layout, and optimized conversion elements.

Key Features:
* Modern hero section with phone mockups
* Feature grid showcasing digital wallet capabilities
* Process flow visualization
* Automated fund management highlights
* Call-to-action sections optimized for conversion
* Fully responsive design
* Bootstrap 5 based styling
    """,
    'author': 'Pearl Pixels',
    'website': 'https://www.pearlpixels.com',
    'depends': ['website'],
    'images': [
        'static/description/redeem_description.jpg',
        'static/description/redeem_screenshot.jpg',
    ],
    'data': [
        # Homepage template
        'data/home.xml',
        # 'data/home_page.xml',
        'data/footer.xml',
        'data/header.xml',
        # Theme assets and images
        'data/data.xml',
        # Menu structure (if needed)
        'data/menu.xml',

    ],
    'assets': {
            'web.assets_frontend': [
                'theme_redeem/static/src/scss/style.scss',
            ],
            'web._assets_primary_variables': [
                # 'theme_redeem/static/src/scss/primary_variables.scss',
                'theme_redeem/static/src/lib/bootstrap-icons/bootstrap-icons.css',
            ],
        },
    'installable': True,
    'application': False,
    'auto_install': False,
    'license': 'LGPL-3',
}